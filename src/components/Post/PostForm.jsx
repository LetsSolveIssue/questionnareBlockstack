import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import {
  Control,
  Field,
  Input,
  Label,
  Textarea,
  Select,Option
} from 'react-bulma-components/lib/components/form'
import {
  Button,
  Card,
  Content,
} from 'react-bulma-components'
import { POST_FILENAME } from 'utils/constants'
import generateUUID from 'utils/generateUUID'

class PostForm extends Component {

  constructor(props){
    super(props);
const {post= {}} = props;
const { user= {}} = props;
console.log(user)
    this.state = {
      // title: post.title || '',
      // description: post.description || '',
      personname : user.personname || '',
      email :  user.email || '',
      blockstackId : user.blockstackId || '',
      department : user.department || '',
      posts: [],
      users : []
     
    }
  }



  static propTypes = {
    userSession: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    post :PropTypes.object,
    type : PropTypes.string.isRequired
  }

  componentDidMount() {
    this.loadUsers()
  }

  loadUsers = async () => {
  
    const { userSession } = this.props
    const options = { decrypt: false }

    const result = await userSession.getFile(`users.json`, options)
    console.log(result)
    if (result) {
     return this.setState({ users: JSON.parse(result) })
    }
     
    return null
  }
   editPost = async () => {
    const options = { encrypt: false }
   const { personname, email, blockstackId,department,users } = this.state
    const { history, userSession, username } = this.props
 const {user} = this.props;
    // for posts.json
    const params = {
      id : user.id,
      personname,
      email,
      blockstackId,
      department

    }
    console.log(params);
 
   const editedPostForIndex = _.map(users,(p)=>{
     if(p.id === user.id){
       return params;
     }
     return p;
   })

   try{
    await userSession.putFile(`users.json`,JSON.stringify(editedPostForIndex),options);
    //await userSession.putFile(`post-${post.id}.json`,JSON.stringify(detailParams),options);
    this.setState({
      personname :'',
      email :'',
      blockstackId :'',
      department :'',
    },() => history.push(`/admin/${username}/users`))
   }catch(e){
    console.log(e.message)
   }
   }
   createUser = async () => {
    const options = { encrypt: false }
    const { personname, email, blockstackId,department,users } = this.state
    const { history, userSession, username } = this.props
    const id = generateUUID()

    // for posts.json
    const params = {
      id,
      personname,
      email,
      blockstackId,
      department
    }
   
 
   try{
     if(users.length > 0)
    await userSession.putFile(`users.json`,JSON.stringify([...users,params]),options)
    else
    await userSession.putFile(`users.json`,JSON.stringify([users,params]),options)
    this.setState({
      title: '',
      personname:'',
      email:'',
      blockstackId:'',
      department:''
    }, () => history.push(`/admin/${username}/users`))
    
   }catch(e){
     console.log(e)
   }
   
  }

  onChange = (e) => {
   
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { type } = this.props;

    return type === 'edit' ? this.editPost() : this.createUser()
  
  }

 
  render() {
   
    return (
      <Card>
        <Card.Content>
          <Content>
           
            <form onSubmit={this.onSubmit} className="post-form">
              <Field>
                <Label>Username</Label>
                <Control>
                  <Input
                    name="personname"
                    onChange={this.onChange}
                    placeholder="Name Of person"
                    value={this.state.personname}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Email</Label>
                <Control>
                  <Input
                    name="email"
                    onChange={this.onChange}
                    placeholder="Email Of person"
                    value={this.state.email}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Blockstack Id</Label>
                <Control>
                  <Input
                    name="blockstackId"
                    onChange={this.onChange}
                    placeholder="BlockStackId Of person"
                    value={this.state.blockstackId}
                  />
                </Control>
              </Field>
              <Field>
                <Label>
                  Department
                </Label>
                <Control>
                  <Select name="department" onChange={this.onChange} value={this.state.department}>
                  <option>Select dropdown</option>
                  <option value="development">Development</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">HR</option>
                     
                  </Select>
                </Control>
              </Field>
            
              <Field kind="group">
                 <Control>
                   <Button>Cancel</Button>
                 </Control>
                 <Control>
                   <Button
                     color="link"
                     type="submit"
                    >
                      Submit
                  </Button>
                 </Control>
               </Field>
            </form>
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

export default withRouter(PostForm)