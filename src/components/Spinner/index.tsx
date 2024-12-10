interface spinnerType {
  color?: string;
  size?: string;
  thickness?: string;
}
function Spinner({ color, size, thickness }: spinnerType) {
  return (
    <div
      className="spinner-loading-btn"
      style={{ borderTopColor: color, width: size, height: size, borderWidth: thickness }}
    ></div>
  );
}

export default Spinner;
