package test.testService;

import nju.domain.Manager;
import nju.domain.User;
import nju.exception.InvalidInfoException;
import nju.exception.OtherException;
import nju.exception.UserNotExistException;
import nju.service.serviceImpl.UserServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import test.BaseTest;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by keenan on 04/05/2017.
 */
public class UserServiceTest extends BaseTest {
    @Autowired
    private UserServiceImpl userService;

    @Test
    public void testAddUser() {
        int result = 0;
//        User user=new User("aaa","123456","aaa","12345678907","收到你的","女","90867643272839495854",2000,"qq@mail.com","jdh",true);
//        User user2 = new User("qky", "123456", "sdfxc", "12345678901", "北包包", "男", "34059643272839492910", 2000.0, "h@mail.com", "dd", true, "南京中心");
//
//        try {
//            userService.addUser(user2);
//        } catch (InvalidInfoException e) {
//            result = -1;
//        } catch (UserExistedException e) {
//            result = 1;
//        } catch (OtherException e) {
//            result = 2;
//        }
//
//        Assert.assertEquals(result, 1);
    }

    @Test
    public void testUpdateUser() {
        int result = 0;

        User user = new User();

        try {
            userService.updateUser(user);
        } catch (InvalidInfoException e) {
            result = 1;
        } catch (UserNotExistException e) {
            result = 2;
        } catch (OtherException e) {
            result = 3;
        }

        Assert.assertEquals(result, 1);
    }

    @Test
    public void testFindOneByID() {
        String ID = "10201643272839411132";

        User user = new User();

        try {
            user = userService.findUserByID(ID);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(user.getUsername());
    }

    @Test
    public void testFindAll() {
        List<User> users = new ArrayList<>();

        try {
            users = userService.findAllUsers();
        } catch (Exception e) {
            e.printStackTrace();
        }

        Assert.assertNotEquals(users, null);
    }

    @Test
    public void testFindUserByName() {
        String username = "island";

        try {
            User user = userService.findUserByUsername(username);
            System.out.println(user.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testFindUserByClass() {
        String school = "南京外国语学校仙林分校";
        String sgrade = "2015级";
        String sclass = "1班";
        List<User> users = userService.findUserByClass(school, sgrade, sclass);

        for (User user : users) {
            System.out.println(user.toString());
        }
    }

    @Test
    public void testAddManager() {
        Manager manager = new Manager("nwxl", "123456", "南京外国语学校仙林分校");
        try {
            userService.addManager(manager);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }

    @Test
    public void testFindAllSchoolManager() {
        List<Manager> managers = userService.findAllManagers();
        for (Manager manager : managers) {
            System.out.println(manager.toString());
        }
    }

    @Test
    public void testFindSystemManager() {
        Manager manager = userService.findSystemManger();
        System.out.println(manager.toString());
    }
}
