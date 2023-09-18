import { Tldraw, createTLStore, useEditor } from "@tldraw/tldraw";
import { throttle } from "@tldraw/utils";
import "@tldraw/tldraw/editor.css";
import "@tldraw/tldraw/ui.css";
import useMermaid from "./Mermaid";
import { useLayoutEffect, useState } from "react";
// @ts-ignore
import { mermaidIt } from "./mermaidIt";
// import { InitialDocument } from "./InitialDocument";

export default function App() {
  const [mermaidContent, setMermaidContent] = useState("");
  const [store] = useState(() => createTLStore({}));

  const editor = useEditor();
  // editor.set

  function toMarkdown(content: string) {
    if (content === "") {
      return "";
    }
    return `\`\`\`mermaid\n${content}\n\`\`\``;
  }
  // function onPointerDown() {
  // 	navigator.clipboard.writeText(toMarkdown(mermaidContent))
  // }

  useLayoutEffect(() => {
    // Each time the store changes, run the (debounced) persist function
    const cleanupFn = store.listen(
      throttle(() => {
        const snapshot = store.getSnapshot();
        const text = mermaidIt(snapshot.store);
        // console.log(JSON.stringify(snapshot.store, null, 2));
        setMermaidContent(text as string);
      }, 100)
    );

    // editor.setStyleForNextShapes()
    // editor.open;

    return () => {
      cleanupFn();
    };
  }, [store]);

  const chartRef = useMermaid(mermaidContent);
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="tldraw__editor">
      <div style={{ width: "100vw", height: "50vh" }}>
        <Tldraw autoFocus store={store} />
      </div>

      {/* <div
        style={{
          width: "50vw",
          height: "50vh",
          backgroundColor: "red",
        }}
      ></div> */}
      <div
        style={{
          width: "50vw",
          height: "50vh",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          float: "left",
        }}
      >
        <div ref={chartRef}></div>
      </div>
      <div
        style={{
          width: "50vw",
          height: "50vh",
          float: "left",
        }}
      >
        <p>Markdown</p>
        <textarea
          style={{
            width: "100%",
            height: "100%",
            whiteSpace: "pre",
            overflowWrap: "normal",
            overflowX: "scroll",
          }}
          readOnly
          value={toMarkdown(mermaidContent)}
        ></textarea>
      </div>
    </div>
  );
}
