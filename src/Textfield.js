import React, { PropTypes } from 'react';
import classNames from 'classnames';
import mdlUpgrade from './utils/mdlUpgrade';

class Textfield extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        containerStyle: PropTypes.string,
        error: PropTypes.string,
        expandable: PropTypes.bool,
        expandableIcon: PropTypes.string,
        floatingLabel: PropTypes.bool,
        label: PropTypes.string.isRequired,
        maxRows: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        rows: PropTypes.number,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    }

    _handleChange = (e) => {
        this.props.onChange(e.target.value);
    }

    render() {
        var { className, containerClassName, containerStyle,
              error, expandable, expandableIcon,
              floatingLabel, label, maxRows, onChange,
              rows, value, ...otherProps } = this.props;

        var hasRows = !!rows;
        var inputId = 'textfield-' + label.replace(/[^a-z0-9]/gi, '');
        var inputTag = hasRows || maxRows > 1 ? 'textarea' : 'input';

        var input = React.createElement(inputTag, {
            className: classNames('mdl-textfield__input', className),
            id: inputId,
            key: inputId,
            value: value,
            onChange: this._handleChange,
            rows: rows,
            ...otherProps
        });

        var inputAndLabelError = [
            input,
            !expandable ? (
                <label key="label" className="mdl-textfield__label" htmlFor={inputId}>{label}</label>
            ) : null,
            error ? (
                <span key="error" className="mdl-textfield__error">{error}</span>
            ) : null
        ];

        var containerClasses = classNames('mdl-textfield mdl-js-textfield', {
            'mdl-textfield--floating-label': floatingLabel,
            'mdl-textfield--expandable': expandable
        }, containerClassName);

        var field;
        if(expandable) {
            field = React.createElement('div', {className: 'mdl-textfield__expandable-holder'}, inputAndLabelError);
        }
        else {
            field = inputAndLabelError;
        }

        return (
            <div className={containerClasses} style={containerStyle}>
                {expandable ? (
                    <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={inputId}>
                        <i className="material-icons">{expandableIcon}</i>
                    </label>
                ) : null}
                {field}
            </div>
        );
    }
}

export default mdlUpgrade(Textfield);
