import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-create-item-clip",
	imports: [RouterModule],
	templateUrl: "./create-item-clip.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateItemClipComponent {}
