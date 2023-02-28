import autoprefixer from "autoprefixer";
import { resolve } from "path";
import { imagetools } from "vite-imagetools";
import handlebars from "vite-plugin-handlebars";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

/** @type {import('vite').UserConfig} */
export default {
  base: "/gslc2/",
  root,
  build: {
    outDir,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        school: resolve(root, "school/index.html"),
        enroll: resolve(root, "school/enroll/index.html"),
        programs: resolve(root, "school/programs/index.html"),
        staff: resolve(root, "school/staff/index.html"),
        parents: resolve(root, "school/parents/index.html"),
      },
    },
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, "partials"),
    }),
  ],
};
