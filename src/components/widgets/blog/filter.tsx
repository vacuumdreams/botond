import { MultiSelect } from '@/components/ui/multi-select'

export type Sort = {
  type: 'ASC' | 'DESC'
}

export type Filters = {
  tags: string[]
}

export type FilterOptions = Pick<Filters, 'tags'>

type BlogFiltersProps = {
  filters: Filters
  options: FilterOptions
  sort: Sort
  setFilters: (filters: Filters) => void
  setSort: (sort: Sort) => void
}

export function BlogFilters({ filters, options, sort, setFilters, setSort }: BlogFiltersProps) {
  return (
    <div>
      <MultiSelect
        placeholder="All tags"
        options={options.tags.map(tag => ({ label: tag, value: tag }))}
        value={filters.tags}
        onChange={(tags) => setFilters({ tags })}
      />
    </div>
  )
}
