import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxillary/Auxillary'

const withErrorHandler = (WrapedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    };

    componentWillMount() {

        this.reqInterceptior = axios.interceptors.request.use(request => {
          this.setState ( {error: null});
          return request;
        })

        this.resInterceptior = axios.interceptors.response.use(res => res, error => {
          this.setState ( {error: error});
        })
    }

    errorConfirmedHandler = () => {
        this.setState({error: null});
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptior);
      axios.interceptors.request.eject(this.resInterceptior);
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapedComponent {...this.props}/>
        </Aux>
      );
    }
  }
};

export default withErrorHandler;