const BlurCircle = ({top = "auto", left = "auto", right= "auto", bottom = "auto"}) => {
  return (
    <div className="absolute -z-55 h-40 w-40 aspect-square rounded-full bg-primary/40 blur-3xl"
    style={{top: top, left: left, right: right, bottom: bottom}}>

    </div>
  )
}

export default BlurCircle