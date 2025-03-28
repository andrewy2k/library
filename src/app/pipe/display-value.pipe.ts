import { Pipe, PipeTransform } from '@angular/core';
import { ELibraryKeys, IContact, ILibrary } from '../models/library';

@Pipe({
  name: 'displayValue',
  standalone: true
})
export class DisplayValuePipe implements PipeTransform {
  transform(obj: ILibrary | null, key: keyof ILibrary): string {
    if (!obj) return '';

    let value = obj[key];

    if(typeof value === "object" && value !== null){
      switch (key){
        case ELibraryKeys.Email:
        case ELibraryKeys.Fax:
        case ELibraryKeys.PublicPhone:
          value = obj[key].map((item: IContact)=>{
            return item.hasOwnProperty(key) ? item[key] : '';
          }).join(', ');
          break;
        case ELibraryKeys.geoData:
          value = obj[key].coordinates.map((coord)=>`(${coord.join(', ')})`).join(', ');
          break;
        case ELibraryKeys.ObjectAddress:
          value = obj[key].map((addres)=>addres.Address).join(',');
          break;
        case ELibraryKeys.WorkingHours:
          value = obj[key].map((v)=>`${v.DayWeek}: ${v.WorkHours}`).join(', ');
          break;
      }
    }

    return String(value || '-');
  }

}
