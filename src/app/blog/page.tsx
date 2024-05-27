import { BlogList } from "@/components/widgets/blog/list"
import { getOrigin } from '@/lib/utils'

export const metadata = {
  title: "Blog - Botond Fekete",
  metadataBase: getOrigin(),
}

export default function BlogPage() {
  return (
    <BlogList />
  )
}
