import { Link, PageContent, Toolbar } from 'framework7-react';
import { Component } from 'react'
import Utils from '../utils/Utils';

class Pagination extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        const self = this;
        const { items, pagination } = self.props;


        return <>
            <Toolbar bottom className='data-table'>
                <div className="data-table-footer ml-auto mr-auto">
                    <div className="data-table-rows-select">
                        # Items
                        <Link smartSelect smartSelectParams={{
                            openIn: 'popover',
                            closeOnSelect: true
                        }} >
                            <select defaultValue={pagination.page_size}>
                                {pagination.page_sizes.map((page_size, idx) => {
                                    var key = `page_size_${page_size}`;
                                    return <option value={page_size} key={key}>{page_size}</option>
                                })}
                            </select>
                            {pagination.page_size}
                        </Link>
                    </div>
                    <div className="data-table-pagination">
                        <span className="data-table-pagination-label">Display {Utils.number_format(pagination.from)}-{Utils.number_format(pagination.to)} of {Utils.number_format(pagination.item_count)}</span>
                        <a href="#" className="link disabled">
                            <i className="icon icon-prev color-gray"></i>
                        </a>
                        <a href="#" className="link">
                            <i className="icon icon-next color-gray"></i>
                        </a>
                    </div>
                </div>
            </Toolbar>
            <PageContent>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th className="label-cell th-sticky bg-secondary text-white">URL</th>
                            <th className="label-cell th-sticky bg-secondary text-white">NAICS</th>
                            <th className="label-cell th-sticky bg-secondary text-white">Status</th>
                            <th className="label-cell th-sticky bg-secondary text-white">Created date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 && items.map((item, i) => {
                            return <tr key={item.id}>
                                <td className="label-cell">
                                    {item.logo_url ?
                                        <img className='mr-1' width="20" height="20" src={item.logo_url} /> : ''}
                                    <a className='link external' target='_blank' href={item.url}>{item.url}</a></td>
                                <td className="label-cell">
                                    {item.naics ? item.naics : 'n/a'}
                                </td>
                                <td className="label-cell">
                                    {[''].map(() => {
                                        switch (item.status) {
                                            case 0: {
                                                return 'Pending';
                                            }
                                            case 200: {
                                                return 'HTTP OK';
                                            }
                                            case 400: {
                                                return 'HTTP  Not Found';
                                            }
                                            default: {
                                                return item.status;
                                            }
                                        }
                                    })}
                                </td>
                                <td className="label-cell">{item.created_at}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </PageContent>
        </>
    }
}
export default Pagination;
