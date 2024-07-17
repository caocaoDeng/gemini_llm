import { forwardRef, useImperativeHandle, useRef } from 'react'

export interface IUploadEmitEvent {
  click(): void
}

const IMAGEMIMETYPE = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/heic',
  'image/heif',
]

const AUDIOMIMETYPE = [
  'audio/wav',
  'audio/mp3',
  'audio/aiff',
  'audio/aac',
  'audio/ogg',
  'video/ogg',
  'audio/flac',
]

export default forwardRef(function Upload(
  { children, ...rest }: { children: React.ReactNode },
  ref: React.ForwardedRef<IUploadEmitEvent>
) {
  const inputDom = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

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
        {...rest}
        multiple
        className="hidden"
        type="file"
        accept={[...IMAGEMIMETYPE, ...AUDIOMIMETYPE].join(',')}
        onChange={handleChange}
      />
    </div>
  )
})
