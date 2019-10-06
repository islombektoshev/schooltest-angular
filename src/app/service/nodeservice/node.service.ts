import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private node: Map<string, any> = new Map<string, any>();

  constructor() {

  }

  public clear(): void {
    this.node.clear();
  }

  public delete(key: string): boolean {
    return this.node.delete(key);
  }

  public forEach(callbackfn: (value: string, key: any, map: Map<string, any>) => void, thisArg?: any): void {
    this.node.forEach(callbackfn, thisArg);
  }

  public get(key: string): any | undefined {
    return this.node.get(key);
  }

  public has(key: string): boolean {
    return this.node.has(key);
  }

  public set(key: string, value: any) {
      this.node.set(key, value);
  }
}
