package kr.co.iei.subject.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchItem {
	private String searchKeyword;
	private Integer category;
	private Integer level;
	private Integer sort;
}
