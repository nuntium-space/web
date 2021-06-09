import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomService
{
  constructor
  (
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  )
  {}

  public appendComponentToBody
  (
    component: Type<unknown>,
    inputs?: { [ key: string ]: any },
    outputs?: { [ key: string ]: () => void },
  ): ComponentRef<unknown>
  {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    Object.entries(inputs ?? {}).forEach(([ key, value ]) =>
    {
      (componentRef.instance as any)[key] = value;
    });

    Object.entries(outputs ?? {}).forEach(([ key, value ]) =>
    {
      ((componentRef.instance as any)[key] as Observable<unknown>)
        .subscribe({ next: value });
    });

    this.appRef.attachView(componentRef.hostView);

    document.body.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

    return componentRef;
  }

  public removeComponentFromBody(componentRef: ComponentRef<unknown>)
  {
    this.appRef.detachView(componentRef.hostView);

    componentRef.destroy();
  }
}
