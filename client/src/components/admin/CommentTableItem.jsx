import { assets } from "../../assets/assets";

const CommentTableItem = ({ comment, fetchComments }) => {

    const { createdAt, _id, blog } = comment;
    const blogDate = new Date(createdAt);

    return (
        <tr className="order-y border-gray-300">
            <td className="px-6 py-4">
                <b className="font-medium text-gray-600">Blog</b> : {blog.title}
                <br />
                <br />
                <b className="font-medium text-gray-600">Name</b> : {comment.name}
                <br />
                <b className="font-medium text-gray-600">Comment</b> : {comment.content}
            </td>

            <td className="px-6 py-4 max-sm:hidden">
                {blogDate.toLocaleDateString()}
            </td>

            <td className="px-6 py-4">
                <div className="inline-flex items-center gap-4">
                    {
                        !comment.isApproved ?
                            <img
                                className="w-5 hover:scale-110 transition-all cursor-pointer"
                                src={assets.tick_icon}
                                alt="icon"
                            /> :
                            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>
                    }

                    <img className="w-5 hover:scale-110 transition-all cursor-pointer" src={assets.bin_icon} />
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem