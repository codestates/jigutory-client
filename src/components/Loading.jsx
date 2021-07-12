import React, { Component } from 'react';
import '../styles/Loading.scss';

class PopupContent extends Component {
  render() {
    return (
      <div className="dimmed_layer_wrapper">
        <div className="full_layer">
          <div className="common_alert_loading">
            <div>Loading....</div>
            <div className="loading"></div>
            <div>
              <button type="button" onClick={this.props.onClose}>close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupContent;