import { toast } from "react-toastify";

export const Highlight = ({ content }: { content: string }) => {
  return (
    <div className="highlight mt-4">
      <i
        className="fa fa-copy copy-icon"
        onClick={() => {
          navigator.clipboard.writeText(content);

          toast("🦄 Copied!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
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
