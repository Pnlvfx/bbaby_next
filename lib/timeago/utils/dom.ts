const ATTR_TIMEAGO_TID = 'timeago-id';

export function getDateAttribute(node: HTMLElement): string {
  const n =  node.getAttribute('datetime');
  if (!n) {
      return ''} else {
          return n;
      }
}

export function setTimerId(node: HTMLElement, timerId: number): void {
  // @ts-ignore
  node.setAttribute(ATTR_TIMEAGO_TID, timerId);
}

/**
 * get the timer id
 * @param node
 */
