import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface FeatureItem {
  id: string
  title: string
  bodyHtml: string
}

interface FeaturesCarouselProps {
  features: FeatureItem[]
  className?: string
}

export function FeaturesCarousel({ features, className }: FeaturesCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const length = features.length

  if (length === 0) return null

  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + length) % length)
  }

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % length)
  }

  const visibleIndices = [0, 1, 2].map((offset) => (currentIndex + offset) % length)
  const visibleFeatures = visibleIndices.map((i) => features[i])

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex items-stretch gap-6 overflow-hidden">
        {visibleFeatures.map((feature, j) => (
          <Card
            key={`${feature.id}-${j}`}
            className="flex-1 min-w-0 shrink-0 basis-0 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-muted-foreground prose prose-sm prose-neutral dark:prose-invert max-w-none [&_strong]:font-semibold [&_em]:italic"
                dangerouslySetInnerHTML={{ __html: feature.bodyHtml }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={goPrev}
          aria-label="Previous features"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          onClick={goNext}
          aria-label="Next features"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  )
}
