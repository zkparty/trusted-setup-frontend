// Library imports
import { useMemo } from 'react'
import styled from 'styled-components'
// Component imports
import { ReactComponent as LeftArrowIcon } from '../assets/left-arrow.svg'

const MAX_PAGE_SHORTCUTS = 6

type Props = {
  page: number
  setPage: (page: number) => void
  // pages: number[]
  totalPages: number
}
const Pagination = ({ page, setPage, totalPages }: Props) => {

  const pageNumbersToDisplay = useMemo<number[]>(() => {
    let startPage = Math.max(1, page - Math.floor(MAX_PAGE_SHORTCUTS / 2))
    let endPage = Math.min(totalPages, startPage + MAX_PAGE_SHORTCUTS - 1)
    // If we're at the end, pad to the left
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - MAX_PAGE_SHORTCUTS + 1)
    }
    // If we're at the start, pad to the right
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + MAX_PAGE_SHORTCUTS - 1)
    }
    return Array.from({ length: endPage + 1 - startPage }, (_, i) => i + startPage)
  }, [page, totalPages])

  return (
    <PaginationContainer>
      <LeftArrowIcon onClick={() => setPage(page - 1)} style={{ visibility: page > 1 ? "visible" : "hidden" }}/>
      {pageNumbersToDisplay.map((pageNumber) => (
        <PageIndicator key={pageNumber} active={pageNumber === page} onClick={() => setPage(pageNumber)}>{pageNumber}</PageIndicator>
      ))}
      <RightArrowIcon onClick={() => setPage(page + 1)} style={{ visibility: page < totalPages ? "visible" : "hidden" }}/>
    </PaginationContainer>
  )
}

// Pagination component
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 4rem;
`

const PageIndicator = styled.button<{ active?: boolean }>`
  display: grid;
  place-items: center;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: solid ${({ theme }) => theme.text};
  border-width: ${({ active }) => (active ? '1px' : '0px')};
`

const RightArrowIcon = styled(LeftArrowIcon)`
  transform: rotate(180deg);
`

export default Pagination