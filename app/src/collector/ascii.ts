import { IEvent, IEventType } from "./event"

function marble(event: IEventType) {
  return event[0].toLowerCase()
}

export function render(inputs: { events: IEvent[], id?: string }[]): string[] {
  let times = inputs.reduce((store: number[], { events: list }) => store.concat(list.map(_ => _.time)), [])
  times.sort()
  return inputs.map(({ events: stream, id }, index) => {
    let result = ""
    let ts = times.slice(0)
    let es = stream.slice(0).sort((a, b) => a.time - b.time)
    for (let t = 0, s = 0; t < ts.length; t++) {
      if (s < es.length && ts[t] === es[s].time) {
        result += marble(es[s++].type)
      } else {
        result += "-"
      }
    }
    return id ? `${id} ${result}` : result
  })
}
