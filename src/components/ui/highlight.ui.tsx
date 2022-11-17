import { emitNotification } from "../../services";

export const Highlight = ({ content }: { content: string }) => {
  return (
    <div className="highlight mt-4">
      <i
        className="fa fa-copy copy-icon"
        onClick={() => {
          navigator.clipboard.writeText(content);
          emitNotification("success", "🦄 Copied!");
        }}
      ></i>
      <div
        style={{
          overflowX: "auto",
        }}
      >
        {!content.includes("@context") ? content : <pre>{content}</pre>}
      </div>
    </div>
  );
};
