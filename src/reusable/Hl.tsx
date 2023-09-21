const Hl = ({ text, className = '' }: {text: string, className?:string}) => (
  <h1 className={className}>{text}</h1>
);

export default Hl;
