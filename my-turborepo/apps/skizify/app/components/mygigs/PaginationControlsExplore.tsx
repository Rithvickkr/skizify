'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../@/components/ui/pagination"

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  length : number
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    length
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '12'
  const totalPages = Math.ceil(length / Number(per_page))

  return (
    <div className='flex gap-2'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              isActive={hasPrevPage} 
              href={`/explore/?page=${Number(page) - 1}&per_page=${per_page}`} 
              className={!hasPrevPage ? 'opacity-50 pointer-events-none' : ''}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                href={`/explore/?page=${index + 1}&per_page=${per_page}`} 
                isActive={Number(page) === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext 
              isActive={hasNextPage} 
              href={`/explore/?page=${Number(page) + 1}&per_page=${per_page}`} 
              className={!hasNextPage ? 'opacity-50 pointer-events-none' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PaginationControls
