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

    return <div className={ `Timer ${this.state.status}` }>
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
    status: 'IDLE', // IDLE, RUN, PAUSE, END
    value: 0
  }

  componentDidMount () {
    window.TIMER = this

    this.timer = setInterval(() => {
      let t = new Date().getTime()
      let value = this.getValue(t)
      this.setState({ value })
    }, 1)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  startOrEnd () {
    let { status } = this.state
    if (status == 'IDLE') {
      this._idle_to_run()
    }

    if (status == 'RUN') {
      this._run_to_end()
    }

    if (status == 'PAUSE') {
      this._pause_to_run()
    }
  }

  pause () {
    let { status } = this.state
    if (status == 'RUN') {
      this._run_to_pause()
    }
  }

  reset () {
    let { status } = this.state
    this._all_reset()
  }

  cancel () {
    let { status } = this.state
    if (status == 'END') {
      this._end_to_run()
    }
  }

  getValue() {
    let { status } = this.state

    if (status == 'IDLE') {
      return 0
    }

    if (status == 'RUN') {
      return new Date().getTime() - this.startTime
    }

    if (status == 'END') {
      return this.state.value
    }

    if (status == 'PAUSE') {
      return this.state.value
    }
  }

  _idle_to_run () {
    this.startTime = new Date().getTime()
    this.setState({ status: 'RUN' })
  }

  _run_to_end () {
    this.setState({ status: 'END' })
  }

  _run_to_pause () {
    this.pauseTime = new Date().getTime()
    this.setState({ status: 'PAUSE' })
  }

  _pause_to_run () {
    let pausePeriod = new Date().getTime() - this.pauseTime
    this.startTime += pausePeriod
    this.setState({ status: 'RUN' })
  }

  _all_reset () {
    this.setState({ status: 'IDLE' })
  }

  _end_to_run () {
    this.setState({ status: 'RUN' })
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