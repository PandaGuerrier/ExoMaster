import usePageProps from './use_page_props'

export default function useFlashMessages() {
  const props = usePageProps<{
    errors: []
  }>()

  return props.errors
}
