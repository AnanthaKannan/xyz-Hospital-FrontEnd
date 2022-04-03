const Ha = ({ text, className='' }: {text: string, className?:string}) => {
  return (
    <h3 className={className}>{text}</h3>
  )
}

export default Ha