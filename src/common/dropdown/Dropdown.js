import React from 'react';
import PropTypes from 'prop-types';
import './dropdown.css';

class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listOpen: false,
            headerTitle: this.props.title
        }
    }

    selectItem = (title, id, stateKey) => {
        this.setState({
          headerTitle: title,
          listOpen: false
        }, this.props.resetThenSet(id, stateKey, this.props.dropdownType))
      }

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    render() {
        const { list } = this.props
        const { listOpen, headerTitle } = this.state
        return (
            <div className={ `dd-wrapper ${ this.props.className }` }>
                <div className={ `dd-header ${this.props.classHeader}`} onClick={this.toggleList}>
                    <div className="dd-header-title">{headerTitle}</div>
                    {listOpen
                        ? <img src={require('../../images/arrow-up.png')} width="20px" height="20px"/>
                        : <img src={require('../../images/arrow-down.png')} width="20px" height="20px"/>
                    }
                </div>
                {listOpen && <ul className="dd-list">
                    {list.map((item, index) => (
                        <li className={item.selected ? "dd-list-item selected" : "dd-list-item"} key={item.code}
                            onClick={() => this.selectItem(item.code, item.code, item.key)} >
                            {item.code}
                        </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

Dropdown.propTypes = {
    title: PropTypes.string,
    resetThenSet: PropTypes.func,
    list: PropTypes.array,
    className: PropTypes.string,
    classHeader: PropTypes.string,
}


export default Dropdown;
