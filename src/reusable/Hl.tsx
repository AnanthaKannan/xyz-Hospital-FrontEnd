const Hl = ({ text, className='' }: {text: string, className?:string}) => {
  return (
    <h1 className={className}>{text}</h1>
  )
}

export default Hl