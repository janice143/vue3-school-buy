// 全局事件总线的通信方法
import { onUnmounted } from "vue";
import mitt from "mitt";
const $bus: mitt.Emitter = mitt();

type IUseEventbus = {
  customEmit: (eventName: string, value?:any ) => void;
  customOn: (eventName: string, callback: () => void) => void;
  getIndex: (eventName: string, callback: (index:number) => void) => void;

};
//  自定定触发器
const customEmit = (eventName: string, value?:any) => {
  if(value !== undefined){
    $bus.emit(eventName, value);
  }else{
    $bus.emit(eventName);
  }
  
};

// 自定义接收器
const customOn = (eventName:string, callback:() => void) => {
  $bus.on(eventName, () => callback());
};


const getIndex = (eventName: string, callback: (index:number)=>void) => {
  $bus.on(eventName, (index:number) => callback(index));
};

export const useEventbus = (): IUseEventbus => {
  onUnmounted(() => {
    $bus.all.clear();
  });
  return {
    customEmit,
    customOn,
    getIndex
  };
};
