import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import AuxFile from '../AuxFolder/AuxFile';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    state = {
      error : null
    }
    
    componentDidMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error : null});
        return req; 
      })
      this.resInterceptor = axios.interceptors.response.use(res => res,error => {
        this.setState({error : error});
      })
    }

    errorConfirmedHandler = () =>{
      this.setState({error : null});
    }

    //For memory leaks
    componentWillUnmount () {
      // console.log('Will Unmount',this.reqInterceptor,this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
      
    }

    render() {
      return (
        <AuxFile>
          {console.log(this.state.error)}
          <Modal show={this.state.error}
                 modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent />
        </AuxFile>
      )
    }
  }
}
export default withErrorHandler;