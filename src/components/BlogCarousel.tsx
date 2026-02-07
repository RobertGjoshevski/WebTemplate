import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PostItem {
  slug: string
  title: string
  description: string
  heroImage: string | null
  pubDate: string
}

interface BlogCarouselProps {
  posts: PostItem[]
  base: string
  className?: string
}

export function BlogCarousel({ posts, base, className }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const length = posts.length

  if (length === 0) return null

  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + length) % length)
  }

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % length)
  }

  // Show 3 consecutive items (with wrap)
  const visibleIndices = [0, 1, 2].map((offset) => (currentIndex + offset) % length)
  const visiblePosts = visibleIndices.map((i) => posts[i])

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex items-stretch gap-6 overflow-hidden">
        {visiblePosts.map((post, j) => (
          <article
            key={`${post.slug}-${j}`}
            className="flex-1 min-w-0 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow shrink-0 basis-0"
          >
            {post.heroImage && (
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-48 object-contain bg-muted"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {new Date(post.pubDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <a
                href={`${base}/blog/${post.slug}`}
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={goPrev}
          aria-label="Previous posts"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={goNext}
          aria-label="Next posts"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  )
}
