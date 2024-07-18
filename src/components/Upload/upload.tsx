import { forwardRef, useImperativeHandle, useRef } from 'react'
import { IMAGEMIMETYPE, AUDIOMIMETYPE, VIDEOMIMETYPE } from './mime'

export interface IUploadEmitEvent {
  click(): void
}

const accept = [...IMAGEMIMETYPE, ...AUDIOMIMETYPE, ...VIDEOMIMETYPE].join(',')

export default forwardRef(function Upload(
  { children, ...rest }: { children: React.ReactNode; [key: string]: any },
  ref: React.ForwardedRef<IUploadEmitEvent>
) {
  const inputDom = useRef<HTMLInputElement>(null)

  useImperativeHandle(
    ref,
    () => ({
      click() {
        inputDom.current?.click()
      },
    }),
    []
  )

  return (
    <div className="flex items-center justify-center">
      {children}
      <input
        ref={inputDom}
        multiple
        className="hidden"
        type="file"
        accept={accept}
        {...rest}
      />
    </div>
  )
})
