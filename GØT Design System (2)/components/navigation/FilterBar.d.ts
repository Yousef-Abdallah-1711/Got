/** Category tab rail + product count + filter trigger + sort — top of shop/category grids. */
export interface FilterBarProps {
  tabs?: string[];
  active?: string;
  onTab?: (tab: string) => void;
  count?: number;
  sort?: string;
  sortOptions?: string[];
  onSort?: (v: string) => void;
  /** applied filter count shown in the trigger */
  filterCount?: number;
  /** open the filter drawer / bottom sheet */
  onFilters?: () => void;
}
export declare function FilterBar(props: FilterBarProps): JSX.Element;
