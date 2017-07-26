package nju.controller;

import com.github.pagehelper.PageInfo;
import nju.domain.Clothes;
import nju.domain.Type;
import nju.service.ClothesService;
import nju.service.TypeService;
import nju.utils.ClothesAttributes;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by island on 2017/7/19.
 */
@Controller
@RequestMapping("/clothesAction")
public class ClothesController {

    @Autowired
    private TypeService typeService;

    @Autowired
    private ClothesService clothesService;

    @RequestMapping(value = "/uploadClothes", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> uploadClothes(HttpServletRequest request) {
        Map<String, Object> map = new HashedMap();
        System.out.println(1);

//        String school = request.getParameter("school");

        MultipartResolver resolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        MultipartHttpServletRequest multipartRequest = resolver.resolveMultipart(request);
        MultipartFile multipartFile = multipartRequest.getFile("file");
        String school = multipartRequest.getParameter("school");
        String type = multipartRequest.getParameter("type");
        String gender = multipartRequest.getParameter("gender");
        String size = multipartRequest.getParameter("size");
        System.out.println(school);
        System.out.println(type);
        System.out.println(gender);
        System.out.println(size);

        if(multipartFile != null) {
            String trueFileName = school + type + String.valueOf(System.currentTimeMillis()) + ".jpg";
            String path = "/Users/island/IdeaProjects/UniformCharity/src/main/webapp/static/icons/" + trueFileName;
            System.out.println(path);
            try {
                multipartFile.transferTo(new File(path));
            } catch (IOException e) {
                e.printStackTrace();
            }
            map.put("success", "true");
            map.put("clothesID", "123");
        }else{
            map.put("clothesID", "123");

        }

//        clothesService.addClothes();
//        List<String> s = new ArrayList<>();
//        for(int i = 0; i < schools.size(); i++){
//            s.add(schools.get(i).getSchoolName());
//            System.out.println(schools.get(i).getSchoolName());
//        }
//        map.put("success", "true");
//        map.put("schools", s);
        return map;
    }

    @RequestMapping(value = "/allTypesOfSchool", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getAllSchool(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashedMap();
        String school = request.getParameter("school");
        List<Type> types = typeService.findAllTypesOfSchool(school);
        List<String> s = new ArrayList<>();
        for (int i = 0; i < types.size(); i++) {
            s.add(types.get(i).getClothestype());
            System.out.println(types.get(i).getClothestype());
        }
        map.put("success", "true");
        map.put("type", s);
        return map;
    }

    @RequestMapping(value = "/searchClothes", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> searchClothes(HttpServletRequest request) {
        Map<String, Object> map = new HashedMap();
        String school = request.getParameter("school");
        String type = request.getParameter("type");
        String gender = request.getParameter("gender");
        String size = request.getParameter("size");
        int page = Integer.parseInt(request.getParameter("page"));
        System.out.println(school);
        System.out.println(type);
        System.out.println(gender);
        System.out.println(size);
        System.out.println(page);
        Map<ClothesAttributes, String> clothesMap = new HashedMap();
        clothesMap.put(ClothesAttributes.schoolName, school);
        clothesMap.put(ClothesAttributes.gender, gender);
        clothesMap.put(ClothesAttributes.size, size);
        clothesMap.put(ClothesAttributes.type, type);
        PageInfo<Clothes> clothesPageInfo = clothesService.findClothesByAttributes(clothesMap, page, 20);
        long maxPage = clothesPageInfo.getTotal();
        if(clothesPageInfo != null){
            List<Clothes> clothes = clothesPageInfo.getList();
            System.out.println("有几件衣服：" + clothes.size());

            if(clothes.size() > 0){
                map.put("success", "true");
                map.put("clothes", clothes);
                map.put("maxPage", maxPage);
            }else{
                map.put("success", "false");
                map.put("error", "无结果");
            }
        }
        return map;
    }
}