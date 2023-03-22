export function LoadingSpinner (props: { size?: number }) {
  return (
    <div
      className={`h-${props.size || 12} w-${
        props.size || 12
      } inline-block animate-spin rounded-full border-[3px] border-current border-t-transparent text-indigo-600`}
      role='status'
      aria-label='loading'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export function LoadingPage () {
  return (
    <div className='absolute top-0 right-0 flex h-screen w-screen items-center justify-center'>
      <LoadingSpinner size={16} />
    </div>
  )
}
