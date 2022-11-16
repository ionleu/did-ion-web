export const Highlight = ({ content }: { content: string }) => {
  return (
    <div className="highlight mt-4">
      <i className="fa fa-copy copy-icon"></i>
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
