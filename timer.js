class Timer extends React.Component {
  render () {
    let { value } = this.state
    let md = moment.duration(value)

    let d = md.days()
    let _d = d > 0 ? `${d}:` : ``

    let h = md.hours()
    let _h = h > 0 ? `${h}:` : ``

    let m = md.minutes()
    let _m = m > 9 ? `${m}:` : `0${m}:`

    let s = md.seconds()
    let _s = s > 9 ? `${s}.` : `0${s}.`

    let ss = ~~(md.milliseconds() / 100)

    return <div className={ 'Timer' }>
      <div className={ 'value' }>{ `${_d}${_h}${_m}${_s}${ss}` }</div>
      <div className={ 'grids' }>
        <Grid n={ h } />
        <Grid n={ ~~(m / 10) } />
        <Grid n={ m % 10 } />
        <Grid n={ ~~(s / 10) } />
        <Grid n={ s % 10 } />
        <Grid n={ ss } />
      </div>
    </div>
  }

  state = {
    value: 0
  }

  componentDidMount () {
    this.start = new Date().getTime()
    this.timer = setInterval(() => {
      let t = new Date().getTime()
      let value = t - this.start
      this.setState({ value })
    }, 1)
  }
}

class Grid extends React.Component {
  render () {
    let s = getS(this.props.n)

    return <div className={ 'Grid' }>
      <span className={ s[0] === '1' ? 'o' : 'c' }></span>
      <span className={ s[1] === '1' ? 'o' : 'c' }></span>
      <span className={ s[2] === '1' ? 'o' : 'c' }></span>
      <span className={ s[3] === '1' ? 'o' : 'c' }></span>
    </div>
  }
}

const getS = (n) => {
  return [
    '0000', '0001', '0010', '0011', '0100',
    '0101', '0110', '0111', '1000', '1001'
  ][n]
}


ReactDOM.render(
  <Timer />,
  document.getElementById('root')
)