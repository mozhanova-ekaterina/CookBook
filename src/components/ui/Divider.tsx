type Props = {
  type: "vertical" | "horizontal";
};
const Divider: React.FC<Props> = ({ type = 'horizontal' }) => {
  return <div className="w-full h-[1px] bg-primary"></div>;
};

export default Divider;
