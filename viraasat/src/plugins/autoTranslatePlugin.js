import parser from "@babel/parser";
import traverseModule from "@babel/traverse";
import generateModule from "@babel/generator";
import crypto from "crypto";
import path from "path";

const traverse =
  traverseModule.default || traverseModule;

const generate =
  generateModule.default || generateModule;

const TRANSLATABLE_ATTRIBUTES = new Set([
  "alt",
  "title",
  "placeholder",
  "aria-label",
  "aria-description",
]);

const createHash = (text) => {
  return crypto
    .createHash("sha256")
    .update(text)
    .digest("hex")
    .slice(0, 12);
};

const normalizeText = (text) => {
  return text
    .replace(/\s+/g, " ")
    .trim();
};

export default function autoTranslatePlugin() {
  return {
    name: "viraasat-auto-translate",

    enforce: "pre",

    transform(code, id) {
      if (
        id.includes("node_modules") ||
        (!id.endsWith(".jsx") &&
          !id.endsWith(".tsx"))
      ) {
        return null;
      }

      // Don't transform translation infrastructure itself
      if (
        id.includes("/i18n/") ||
        id.includes("\\i18n\\")
      ) {
        return null;
      }

      let ast;

      try {
        ast = parser.parse(code, {
          sourceType: "module",
          plugins: [
            "jsx",
            "typescript",
          ],
        });
      } catch (error) {
        console.error(
          "Auto translation parser error:",
          id,
          error.message
        );

        return null;
      }

      const discoveredTexts = [];

      traverse(ast, {
        JSXText(path) {
          const originalText = path.node.value;

          const text = normalizeText(
            originalText
          );

          // Ignore empty whitespace
          if (!text) {
            return;
          }

          // Ignore very short/non-text values
          if (text.length < 2) {
            return;
          }

          const key = `auto.${createHash(text)}`;

          discoveredTexts.push({
            key,
            text,
            type: "jsx-text",
            file: id,
          });

          const callExpression = {
            type: "CallExpression",

            callee: {
              type: "Identifier",
              name: "__vt",
            },

            arguments: [
              {
                type: "StringLiteral",
                value: key,
              },
              {
                type: "StringLiteral",
                value: text,
              },
            ],
          };

          path.replaceWith({
            type: "JSXExpressionContainer",
            expression: callExpression,
          });
        },

        JSXAttribute(path) {
          const attributeName =
            path.node.name?.name;

          if (
            !TRANSLATABLE_ATTRIBUTES.has(
              attributeName
            )
          ) {
            return;
          }

          const value = path.node.value;

          if (
            !value ||
            value.type !== "StringLiteral"
          ) {
            return;
          }

          const text = normalizeText(
            value.value
          );

          if (!text) {
            return;
          }

          const key = `auto.${createHash(text)}`;

          discoveredTexts.push({
            key,
            text,
            type: `attribute:${attributeName}`,
            file: id,
          });

          path.node.value = {
            type: "JSXExpressionContainer",

            expression: {
              type: "CallExpression",

              callee: {
                type: "Identifier",
                name: "__vt",
              },

              arguments: [
                {
                  type: "StringLiteral",
                  value: key,
                },

                {
                  type: "StringLiteral",
                  value: text,
                },
              ],
            },
          };
        },
      });

      if (discoveredTexts.length === 0) {
        return null;
      }

      /*
       * Inject runtime import.
       */

      const sourceFile = path.resolve(id);

      const runtimeFile = path.resolve(
        process.cwd(),
        "src/i18n/autoTranslate.js"
      );

      let relativeImport =
        path.relative(
          path.dirname(sourceFile),
          runtimeFile
        );

      relativeImport =
        relativeImport.replace(/\\/g, "/");

      if (!relativeImport.startsWith(".")) {
        relativeImport = `./${relativeImport}`;
      }

      ast.program.body.unshift({
        type: "ImportDeclaration",

        specifiers: [
          {
            type: "ImportSpecifier",

            imported: {
              type: "Identifier",
              name: "translateText",
            },

            local: {
              type: "Identifier",
              name: "__vt",
            },
          },
        ],

        source: {
          type: "StringLiteral",
          value: relativeImport,
        },
      });

      const output = generate(ast, {
        sourceMaps: true,
      }, code);

      console.log(
        `\n🌐 Auto translations: ${path.basename(id)}`
      );

      discoveredTexts.forEach((item) => {
        console.log(
          `   ${item.key} → "${item.text}"`
        );
      });

      return {
        code: output.code,
        map: output.map,
      };
    },
  };
}