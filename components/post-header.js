import Avatar from '../components/avatar'
import DateFormater from '../components/date-formater'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-6 text-lg">
        <DateFormater dateString={date} />
      </div>
    </>
  )
}
