import DolaImg from './dola.png'

export const DolaIcon = ({ style }: any) => {
  return (
    <img src={DolaImg} style={{ width: '50px', height: '50px', ...style }} />
  )
}
