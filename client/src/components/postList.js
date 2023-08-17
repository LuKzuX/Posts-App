const PostList = ({ props }) => {
  return (
    <div>
      {props &&
        props.map((item) => (
          <div className='post' key={item.post_id}>
            <h2>{item.desc}</h2>
            <img src={item.postPic}></img>
          </div>
        ))}
      {console.log(props)}
    </div> 
  )
}

export default PostList
