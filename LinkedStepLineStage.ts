const w : number = window.innerWidth
const h : number = window.innerHeight
const scGap : number = 0.05
const scDiv : number = 0.51
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const nodes : number = 5
const lines : number = 4
const foreColor : string = "#4CAF50"
const backColor : string = "#BDBDBD"

const maxScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.max(0, scale - i / n)
}

const divideScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.min(1 / n, divideScale(scale, i, n)) * n
}

const scaleFactor : Function = (scale : number) : number => Math.floor(scale / scDiv)

const mirrorValue : Function = (scale : number, a : number, b : number) : number => {
    const k : number = scaleFactor(scale)
    return (1 - k) / a + k / b
}

const updateValue : Function = (scale : number, dir : number, a : number, b : number) : number => {
    return mirrorValue(scale, a, b) * dir * scGap
}

const drawSLNode = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    const xgap : number = w / (nodes + 1)
    const ygap : number = h / (nodes + 1)
    context.strokeStyle = foreColor
    context.lineCap = 'round'
    context.lineWidth = Math.min(w, h) / strokeFactor
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    context.save()
    context.translate(-xgap + xgap * i + xgap * sc1, h - ygap * i - ygap * sc2)
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(xgap, 0)
    context.stroke()
    context.restore()
}

class LinkedStepLineStage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : LinkedStepLineStage = new LinkedStepLineStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
