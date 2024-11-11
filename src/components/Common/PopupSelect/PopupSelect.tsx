import { PopupAction } from '@/models/Common/PopupSelectionModel';
//parent must have "relative" display.
interface PopupSelectProps {
	actions: PopupAction[];
}
const PopupSelect: React.FC<PopupSelectProps> = ({ actions }) => {
	return (
		<div className="absolute top-3/4 right-0 px-4 secondary-color rounded">
			{actions.map((action, index) => {
				return (
					<div
						className="w-full"
						key={index}
						onClick={action.action}>{action.label}</div>
				)
			})}
		</div>
	)
}
export default PopupSelect;
