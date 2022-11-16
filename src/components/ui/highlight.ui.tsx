import { toast } from "react-toastify";

export const Highlight = ({
  content,
  onCopy,
}: {
  content: string;
  onCopy: () => void;
}) => {
  return (
    <div className="highlight mt-4">
      <i
        className="fa fa-copy copy-icon"
        onClick={() => {
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
          onCopy();
        }}
      ></i>
      <div
        style={{
          overflowX: "auto",
        }}
      >
        {content}
      </div>
    </div>
  );
};
