// 全局事件总线的通信方法
import { onUnmounted } from "vue";
import mitt from "mitt";
const $bus: mitt.Emitter = mitt();

type IUseEventbus = {
  customEmit: (eventName: string, value?:any ) => void;
  customOn: (eventName: string, callback: () => void) => void;

};
//  自定定触发器
const customEmit = (eventName: string, value?:any) => {
  if(value){
    $bus.emit(eventName);
  }else{
    $bus.emit(eventName, value);
  }
  
};

// 自定义接收器
const customOn = (eventName: string, callback: Function) => {
  $bus.on(eventName, () => callback());
};

export const useEventbus = (): IUseEventbus => {
  onUnmounted(() => {
    $bus.all.clear();
  });
  return {
    customEmit,
    customOn,
  };
};
