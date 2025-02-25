import records from './../assets/FMSCA records.json'
import { IFMSCARow, PaginatedResponse } from '../types.ts'
import { filterFields } from '../components/FMSCAViewer/tableModel.ts'

const dataService = {
    getData: (
        rowsPerPage: number,
        page: number,
        filters: {
            [key: string]: string | number | Date | (string | number | Date)[]
        },
    ): PaginatedResponse<IFMSCARow> => {
        let filteredData: IFMSCARow[] = records.results

        if (filters && Object.keys(filters)?.length > 0) {
            filteredData = filteredData.filter((item) => {
                let matches: boolean | string | number = true

                for (const [key, value] of Object.entries(filters)) {
                    const itemValue = item[key as keyof IFMSCARow]
                    if (itemValue !== undefined) {
                        const filterType = filterFields.find(
                            (f) => f.name === key,
                        )?.type
                        switch (filterType) {
                            case 'date':
                                matches =
                                    matches &&
                                    itemValue &&
                                    new Date(itemValue)
                                        .toDateString()
                                        .includes(
                                            new Date(
                                                value as Date,
                                            ).toDateString(),
                                        )

                                break
                            case 'string':
                                matches =
                                    matches &&
                                    itemValue &&
                                    (itemValue?.toString() || '')
                                        .toLowerCase()
                                        .includes(
                                            (value as string)?.toLowerCase(),
                                        )
                                break
                            case 'number':
                                matches =
                                    matches &&
                                    itemValue &&
                                    (itemValue?.toString() || '').includes(
                                        String(value),
                                    )
                                break
                            case 'phone':
                                matches =
                                    matches &&
                                    itemValue &&
                                    (itemValue as string)
                                        .replace(/\D/g, '')
                                        .includes(
                                            (value as string)?.replace(
                                                /\D/g,
                                                '',
                                            ),
                                        )

                                break
                            default:
                            // Handle other types as needed
                        }

                        if (!matches) {
                            return false
                        }
                    }
                }

                return matches
            })
        }

        const startIndex = page * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        const total_count = filteredData.length
        const total_pages = Math.ceil(total_count / rowsPerPage)

        return {
            data: filteredData.slice(startIndex, endIndex),
            metadata: {
                limit: rowsPerPage,
                skip: startIndex,
                current_page: page + 1,
                total_count,
                total_pages,
            },
        }
    },
}

export default dataService
