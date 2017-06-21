'use strict';

import * as React from 'react';
import SearchInput from './SearchInput';

interface ISearchBarProps {
    onVideoSearch: (term: string) => void;
}

interface ISearchBarState {
    input: string;
}


class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {

    constructor(props: ISearchBarProps) {
        super(props);

        this.state = {
            input: ""
        }
    }

    // TODO: typings
    private onInputChange = (e: React.FormEvent<any>) => {
        const target = (e as any).target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ input: value });
        this.props.onVideoSearch(value);
    };

    public render(): JSX.Element {
        return (
            <div className="search-bar">
                <SearchInput
                    id="search-bar-input"
                    placeholder="Start typing to search..."
                    onChange={this.onInputChange}
                    value={this.state.input}
                />
            </div>
        );
    }
}

export default SearchBar;
