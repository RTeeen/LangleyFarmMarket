
// a class for useful utilities
export class Util {

  /**
   * given DOM children nodes(containing other nodes), search for the first 
   * node of class nodeName.
   * @param {HTMLCollection}
   * @param {string}
   */
  public static searchNode(nodes: HTMLCollection, nodeName: string): any {
    for (let node of nodes) {
      if (node.classList.contains(`${nodeName}`)) {
        return node;
      } else if (node.children.length != 0) {
        let answer = this.searchNode(node.children, nodeName);
        if (answer != undefined) {
          return answer;
        }
      }
    }
  }
}